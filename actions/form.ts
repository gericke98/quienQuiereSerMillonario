"use server";

import { redirect } from "next/navigation";

export async function checkPassword(prevState: any, formData: FormData) {
  //Función para validar que no entre cualquiera (a través de contraseña)
  // Extraigo la info del email
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (rawFormData.email && rawFormData.password) {
    const email = rawFormData.email.toString();
    const password = rawFormData.password.toString();
    if (email && password === process.env.PASSWORD) {
      redirect("/game");
    } else if (email && password !== process.env.PASSWORD) {
      return {
        success: false,
        message: "Contraseña incorrecta",
      };
    } else {
      return {
        success: false,
        message: "Credenciales incorrectas",
      };
    }
  } else {
    return {
      success: false,
      message: "Introducir un valor",
    };
  }
}
