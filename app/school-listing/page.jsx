"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function AddSchoolPage() {
  const {register, handleSubmit, reset, formState: { errors }} = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("file", data.image[0]); 

      const res = await fetch("/api/list-school", {
        method: "POST",
        body: formData, 
      });

      if (res.ok) {
        alert("School listed successfully!");
        router.push("/");
        reset();
      } else {
        const error = await res.json();
        alert(error.error || "Something went wrong");
      }
    } catch (error) {
      alert("Error submitting form");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-purple-50">
      <nav className="w-full flex justify-between items-center px-10 py-4 shadow-sm bg-white sticky top-0 z-10">
        <Link href='/' className="text-2xl font-bold text-purple-600">SchoolBoard</Link>
      </nav>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-4"
      >
        <h1 className="text-2xl font-bold text-purple-600 text-center">
          List Your School
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            School Name
          </label>
          <input
            type="text"
            {...register("name", { required: "School name is required" })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            rows={2}
            {...register("address", { required: "Address is required" })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            {...register("state", { required: "State is required" })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact
          </label>
          <input
            type="text"
            {...register("contact", {
              required: "Contact is required",
              minLength: { value: 10, message: "Must be at least 10 digits" },
            })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
        >
          Submit School
        </button>
      </form>
    </main>
  );
}
