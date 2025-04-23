import { useRef, useState, useCallback } from "react";

export function useFileUpload() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];

      if (!selectedFile) {
        setPreviewUrl("");
        setFileType("");
        setFile(null);
        return;
      }

      setFileType(selectedFile.type);
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    },
    []
  );

  const handleSetPreviewUrl = useCallback((url: string) => {
    setPreviewUrl(url);
  }, []);
  const handleSetFileType = useCallback((type: string) => {
    setFileType(type);
  }, []);

  const clear = () => {
    setPreviewUrl("");
    setFileType("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return {
    fileRef,
    file,
    fileType,
    previewUrl,
    handleFileChange,
    handleSetPreviewUrl,
    handleSetFileType,
    clear,
  };
}
