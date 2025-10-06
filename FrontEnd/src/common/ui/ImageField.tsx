import { Upload } from "lucide-react";
import { useState } from "react";

type ImageFieldProps = {
  name: string;
  register?: any;
  url?: string;
  className?: string;
};

export default function ImageField({ name, register, url, className }: ImageFieldProps) {
  const [preview, setPreview] = useState<string | null>(url ?? null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const registerProps = register ? register(name, { onChange: handleFileChange }) : { onChange: handleFileChange };

  return (
    <div className={`w-[150px]! h-[150px]! relative rounded overflow-hidden bg-white ${className}`}>
      {preview ? (
        <img src={preview} alt="Profile preview" className="w-full h-full object-cover absolute top-0 left-0" />
      ) : (
        <div className="w-full h-full flex items-center justify-center absolute p-6 bg-blue-700 text-white top-0 left-0">
          <Upload />
        </div>
      )}
      <input type="file" accept="image/*" className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer" {...registerProps} />
    </div>
  );
}
