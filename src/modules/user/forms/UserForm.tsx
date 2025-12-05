import { useUserModelStore } from "../stores/userModelStore";
import { useForm } from "react-hook-form";
import { UserSchema, type UserData } from "../schemas/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../common/ui/Input";
import Select from "../../../common/ui/Select";
import ImageField from "../../../common/ui/ImageField";
import { useUpdateUser } from "../hooks/UsersHooks";
import { useEffect } from "react";

export default function UserForm() {
  const { user, closeUserModal } = useUserModelStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
    defaultValues: user ?? {},
  });

  const updateUser = useUpdateUser<UserData>();

const onSubmit = (data: UserData) => {
  if (!user?.id) return;

  console.log("📤 Submitting update:", { id: user.id, user: data });

  updateUser.mutate(
    { id: Number(user.id), user: data },  // id number
    {
      onSuccess: (res) => {
        console.log("✅ Update success:", res);
        closeUserModal();
      },
      onError: (error) => {
        console.error("❌ Failed to update user:", error);
      },
    }
  );
};


useEffect(() => {
  if (user) {
    reset(user); // هنا بنعمل re-init للفورم كل مرة user يتغير
  }
}, [user, reset]);
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Edit Member</h2>

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
<form
  onSubmit={handleSubmit((d) => {
    console.log("📝 Form Data from RHF:", d);   // هنا هتشوف القيم اللي داخلة من الفورم
    console.log("👤 Current user:", user);     // هنا هتشوف الـ user اللي جاي من Zustand
    onSubmit(d);                               // بعد كدا نبعته للـ API
  })}
>
          <div className="flex gap-2 items-center justify-start h-full w-full">
            <ImageField register={register} url={user?.profile_picture} name="profilePicture" />
            <div className="flex flex-col items-start justify-between flex-grow">
              <Input name="email" type="email" label="Email:" register={register} error={errors.email?.message} />
              <Select
                label="Role"
                name="role"
                register={register}
                error={errors.role?.message}
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                ]}
                className="w-full!"
              />
            </div>
          </div>

          <div className="space-y-4 flex gap-2">
            <Input name="username" label="Username:" register={register} error={errors.username?.message} />
          </div>
          <div className="space-y-4 flex gap-2">
            <Input name="full_name" label="Full Name:" register={register} error={errors.full_name?.message} />
          </div>

          <div className="flex gap-2 pt-4">
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Update
            </button>

            <button type="button" onClick={closeUserModal} className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
