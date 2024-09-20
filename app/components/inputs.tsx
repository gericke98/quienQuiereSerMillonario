"use client";
import Logo from "@/public/LOGO_black.png";
import Image from "next/image";
import { FormInput } from "./formInput";
import { Button } from "./button";
import { checkPassword } from "@/actions/form";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Inputs = () => {
  const { toast } = useToast();
  const [initialState, setInitialState] = useState({
    success: false,
    message: "",
  });
  const [state, formAction] = useFormState(checkPassword, initialState);
  useEffect(() => {
    if (state?.message === "Mail no váldo") {
      toast({
        variant: "destructive",
        title: state.message,
        description: "Por favor, introduce un mail válido",
      });
    } else if (state?.message === "Introducir un valor") {
      toast({
        variant: "destructive",
        title: state.message,
        description: "Por favor, introduce un valor",
      });
    }
  }, [toast, state]);
  return (
    <div className="bg-white flex flex-col lg:w-[30%] w-3/4 rounded-3xl items-center lg:px-10 px-5">
      <div className="flex flex-col w-full items-center py-10">
        <Image
          src={Logo}
          alt="Logo"
          width={200}
          height={150}
          priority
          className="w-auto h-auto"
        />
        <span className="border w-full border-slate-100 mt-5" />
        <h5 className="text-xs mt-2 mb-10 text-slate-500">
          ATRAPA ROPA GRATIS
        </h5>
      </div>
      <div className="flex flex-col w-full items-center pb-10">
        <h5 className="text-sm text-slate-600 text-center">
          Introduce tu mail y la contraseña de administrador para iniciar el
          juego
        </h5>
        <form className="mt-6 w-full flex flex-col gap-8" action={formAction}>
          <FormInput name="email" title="Email" icon={false} />
          <FormInput name="password" title="Contraseña admin" icon={false} />
          <Button />
        </form>
      </div>
    </div>
  );
};
