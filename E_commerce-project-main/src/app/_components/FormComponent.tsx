"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoPersonAddSharp } from "react-icons/io5";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { caal } from "../(auth)/signup/signup.server";
import type { SignupFormValues } from "@/types";

export default function FormComponent() {
    
    const [isloading, setisloading] = useState(false)
    const router= useRouter()
    const schema = z
        .object({
            name: z.string().min(1, "Please enter your name"),
            email: z.string().email("Please enter a valid email address"),
            password: z
                .string()
                .regex(
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                    "Minimum eight characters, at least one uppercase, one lowercase, one number, and one special character"
                ),
            rePassword: z.string(),
            phone: z
                .string()
                .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
        })
        .refine((data) => data.password === data.rePassword, {
            message: "Passwords do not match",
            path: ["rePassword"],
        });

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        resolver: zodResolver(schema),
    });

    async function handlesubmit(values: SignupFormValues) {
        setisloading(true)
        const ress =await caal(values)


        
        if (ress) {
            
            setisloading(false)
            router.push("/signin")
            toast.success("sign in has been created.",{
            position:"top-center",
            richColors:true
            
        }) 
        }else{
            setisloading(false)
            toast.error("unexpected erorr",{
            position:"top-center",
            richColors:true
        })
        }
    }

    return (
        <div className="mx-auto">
            <form onSubmit={form.handleSubmit(handlesubmit)}>
                {/* Name */}
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                className="text-[#364153] font-medium text-[16px]"
                                htmlFor={field.name}
                            >
                                Name*
                            </FieldLabel>
                            <Input
                                className={`
          p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent
          ${fieldState.invalid
                                        ? 'border-red-500! focus:border-red-500!'
                                        : 'border-gray-200 focus:border-green-400'
                                    }
        `}{...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your name"
                                autoComplete="off"
                                type="text"
                            />
                            {fieldState.invalid && <FieldError className="text-red-500 mb-2" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Email */}
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                className="text-[#364153] font-medium text-[16px]"
                                htmlFor={field.name}
                            >
                                Email*
                            </FieldLabel>
                            <Input
                                className={`
          p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent
          ${fieldState.invalid 
            ? 'border-red-500! focus:border-red-500!' 
            : 'border-gray-200 focus:border-green-400'
          }
        `}{...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your email"
                                autoComplete="off"
                                type="email"
                            />
                            {fieldState.invalid && <FieldError className="text-red-500 mb-2" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />


                {/* Password */}
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                className="text-[#364153] font-medium text-[16px]"
                                htmlFor={field.name}
                            >
                                Password*
                            </FieldLabel>
                            <Input
                                className={`
                                    p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all 
                                    focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent
                                    ${fieldState.invalid 
                                        ? 'border-red-500! focus:border-red-500!' 
                                        : 'border-gray-200 focus:border-green-400'
          }
        `}{...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your password"
                                autoComplete="off"
                                type="password"
                            />
                            {fieldState.invalid && <FieldError className="text-red-500 mb-2" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                {/* Confirm Password */}
                <Controller
                    name="rePassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                                className="text-[#364153] font-medium text-[16px]"
                                htmlFor={field.name}
                            >
                                Confirm Password*
                            </FieldLabel>
                            <Input
                                className={`
                                    p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent
          ${fieldState.invalid 
            ? 'border-red-500! focus:border-red-500!' 
            : 'border-gray-200 focus:border-green-400'
        }
        `}{...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Confirm your password"
                                autoComplete="off"
                                type="password"
                            />
                            {fieldState.invalid && <FieldError className="text-red-500 mb-2" errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                    {/* Phone */}
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                    className="text-[#364153] font-medium text-[16px]"
                                    htmlFor={field.name}
                                >
                                    Phone*
                                </FieldLabel>
                                <Input
                                    className={`
              p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all 
              focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent
              ${fieldState.invalid 
                ? 'border-red-500! focus:border-red-500!' 
                : 'border-gray-200 focus:border-green-400'
              }
            `}{...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your phone"
                                    autoComplete="off"
                                    type="tel"
                                />
                                {fieldState.invalid && <FieldError className="text-red-500 mb-2" errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <div>
                    <FieldGroup className="w-full my-4 ms-2">
                        <Field orientation="horizontal">
                            <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
                            <FieldLabel className="font-medium text-[14px] cursor-pointer text-[#364153]" htmlFor="terms-checkbox-basic">
                                I agree to the Terms of Service and Privacy Policy *
                            </FieldLabel>
                        </Field>
                    </FieldGroup>
                </div>
                <Button disabled={isloading} className={`w-full disabled:#15803D bg-[#16A34A] font-semibold text-white text-[16px] py-5 hover:bg-[#15803D] cursor-pointer`}>
                  {isloading?<Spinner/>:""}  <IoPersonAddSharp className="me-2" /> Create My Account
                </Button>
            </form>
        </div>
    );
}