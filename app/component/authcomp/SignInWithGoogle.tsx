import { IconBrandGoogle } from '@tabler/icons-react';

const SignInWithGoogle = () => {
  return (
    <div className="w-full justify-center items-center flex">
      <button
        className="flex items-center justify-center bg-white text-slate border border-slate px-4 py-2 rounded-lg shadow-sm hover:shadow-lg hover:bg-gray-50 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => {
          // Add sign in logic here
          alert("Signing in with Google...");
        }}
      >
        <IconBrandGoogle size={24} className="mr-2" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInWithGoogle;