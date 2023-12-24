import { LoginForm } from "./form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen" style={{marginTop:'-10%'}}>
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
          <Image
            src="/assets/images/login.jpg"
            width={377}
            height={277}
            alt="logo"
          />
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
