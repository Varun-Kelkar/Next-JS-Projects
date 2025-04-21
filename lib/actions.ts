"use server";

import { redirect } from "next/navigation";
import { createAuthSession, destroySession } from "./auth";
import { createUser, getUserByEmail } from "./user";
import { hashUserPassword, verifyPassword } from "./hash";
import {
  createBill,
  createExpense,
  getBillsByExpenseId,
  getExpensesByUserId,
} from "./expenses";
import fs from "fs";

export const contactUsAction = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) => {
  const contactData = {
    name: formData.get("name") ?? "",
    email: formData.get("email"),
    query: formData.get("query"),
    createdAt: new Date().toISOString(),
  };

  if (
    isInvalidText(contactData.name as string) ||
    isInvalidEmail(contactData.email as string) ||
    isInvalidText(contactData.query as string)
  ) {
    return {
      message: "Please check your inputs",
    };
  }

  console.log("data", contactData);
};

export const uploadBillAction = async (
  expenseId: number,
  userId: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) => {
  const billData = {
    name: formData.get("name") ?? "",
    description: formData.get("description"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    date: formData.get("date"),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    url: formData.get("url") as any,
    user_id: userId,
    expense_id: Number(expenseId),
    status: "Submitted",
  };

  if (
    isInvalidText(billData.name as string) ||
    isInvalidText(billData.description as string) ||
    isInvalidText(billData.amount as string) ||
    isInvalidText(billData.category as string) ||
    isInvalidText(billData.date as string)
  ) {
    return {
      message: "Please check your inputs",
    };
  }

  const extension = billData.url?.name.split(".").pop();
  const filename = `${(billData.name as string).trim()}-${
    billData.date
  }.${extension}`;
  const filePath = `public/images/${filename}`;

  const stream = fs.createWriteStream(filePath);
  const bufferedImage = await billData.url.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error: unknown) => {
    if (error) {
      throw new Error("Error saving file");
    }
  });

  // all assets are at root dir i.e. /public
  // so we need to remove public from the path
  // and use /images/filename
  billData.url = `/images/${filename}`;
  console.log("billData", billData);

  const result = await createBill(billData);
  console.log("Bill created with ID:", result);
  redirect(`/expenses/${expenseId}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const signUpAction = async (prevState: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const errors: { email?: string; password?: string } = {};

  if (!(email as string)?.includes("@")) {
    errors.email = "Email must be valid";
  }
  if ((password as string)?.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password as string);

  try {
    const userId = createUser(email as string, hashedPassword);
    await createAuthSession(userId as unknown as string);
    redirect("/expenses");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      errors.email = "Email already exists";
      return { errors };
    }
    throw error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const errors: { email?: string; password?: string } = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingUser: any = await getUserByEmail(email as string);
  if (!existingUser) {
    errors.email = "Email not found";

    return {
      errors,
    };
  }

  const isValidPassword = verifyPassword(
    existingUser?.password as string,
    password as string
  );

  if (!isValidPassword) {
    errors.password = "Invalid password";
    return {
      errors,
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/expenses");
}

export async function auth(
  mode: "login" | "signup",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any,
  formData: FormData
) {
  if (mode === "signup") {
    return await signUpAction(prevState, formData);
  } else if (mode === "login") {
    return await login(prevState, formData);
  }
  return { errors: { mode: "Invalid mode" } };
}

export async function logout() {
  await destroySession();
  redirect("/");
}

const isInvalidText = (text: string) => {
  return !text || text.trim() === "";
};

const isInvalidEmail = (email: string) => {
  return !email || !email.includes("@");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createExpenseAction(formData: any, userId: string) {
  const expenseData = {
    ...formData,
    status: "Rejected",
    date: new Date().toISOString(),
    user_id: userId,
  };

  if (
    isInvalidText(expenseData.name as string) ||
    isInvalidText(expenseData.amount as string) ||
    isInvalidText(expenseData.category as string) ||
    isInvalidText(expenseData.date as string)
  ) {
    return {
      message: "Please check your inputs",
    };
  }

  const result = await createExpense(expenseData);

  console.log("Expense created with ID:", result);
}

export async function getAllExpensesAction(userId: string) {
  const result = await getExpensesByUserId(userId);
  return result;
}

export async function getBillsByExpenseIdAction(expenseId: number) {
  const result = await getBillsByExpenseId(expenseId);
  return result;
}

export async function getBillByIdAction(billId: number) {
  const result = await getBillsByExpenseId(billId);
  return result;
}
