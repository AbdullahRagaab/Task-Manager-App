import { X } from "lucide-react";
import { useUserModelStore } from "../stores/userModelStore";
import ImageField from "../../../common/ui/ImageField";
import { useUploadProfilePicture } from "../hooks/UsersHooks";
import { useForm } from "react-hook-form";

export default function ProfileImageModal() {
  const { user, closeUserModal } = useUserModelStore();
  const uploadProfilePicture = useUploadProfilePicture<{ profile_picture: File }>();

  const { register, handleSubmit, reset } = useForm<{ profile_picture: FileList }>();

  const onSubmit = (data: { profile_picture: FileList }) => {
    if (!data.profile_picture?.[0] || !user?.id) return;

    const formData = new FormData();
    formData.append("profile_picture", data.profile_picture[0]);

    uploadProfilePicture.mutate(formData, {
      onSuccess: () => {
        closeUserModal();
        reset();
      },
      onError: (err) => {
        console.error("Upload failed", err);
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white flex flex-col gap-5 w-full max-w-sm rounded-xl p-6">
        <div className="flex items-center justify-between border-b-1 border-b-gray-500 pb-2">
          <h2 className="font-bold text-lg">Change Profile Image</h2>
          <button className="cursor-pointer" onClick={closeUserModal}>
            <X />
          </button>
        </div>

        <form className="flex flex-col gap-5 items-center" onSubmit={handleSubmit(onSubmit)}>
          <ImageField name="profile_picture" register={register} className="rounded-full" />

          <div className="flex flex-row items-center gap-2 justify-between w-full">
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-md flex-1 cursor-pointer">
              Upload
            </button>
            <button type="button" onClick={closeUserModal} className="bg-gray-600 text-white p-2 rounded-md flex-1 cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
