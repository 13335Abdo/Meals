"use client";
import React, { useContext } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, Radio, Description, Label } from "@heroui/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoHomeSharp } from "react-icons/io5";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiInformation2Line } from "react-icons/ri";
import { FaCity, FaCreditCard, FaLocationDot } from "react-icons/fa6";
import type { paymentFormValues } from "@/types/forms";
import { MdCall } from "react-icons/md";
import clsx from "clsx";
import { BsCash } from "react-icons/bs";
import CallCashPaymentAPI, { type shippingType } from "@/CallAPIs/CallCashPaymentAPI";
import { finalContext } from "../_contexts/Ncontext";
import CallCashVisaAPI from "@/CallAPIs/CallVisaPayment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const paymentMethodSchema = z.enum(["cash", "card"]);

const paymentSchema = z.object({
    city: z.string().min(1, "City is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    phone: z.string().min(1, "Phone is required"),
    paymentMethod: paymentMethodSchema,
});

export type PaymentFormData = paymentFormValues & {
    paymentMethod: z.infer<typeof paymentMethodSchema>;
};

const addOns = [
    {
        description: "Pay when your order arrives at your doorstep",
        icon: BsCash,
        title: "Cash on Delivery",
        value: "cash" as const,
    },
    {
        description: "Secure payment with Credit/Debit Card via Stripe",
        icon: FaCreditCard,
        title: "Pay Online",
        value: "card" as const,
    },
];

export default function PaymentComponent() {
    const router = useRouter();

    const form = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            city: "",
            streetAddress: "",
            phone: "",
            paymentMethod: "cash",
        },
    });
    const { cartUser } = useContext(finalContext)

    const paymentMethod = useWatch({
        control: form.control,
        name: "paymentMethod",
    });

    async function submitCash(values: PaymentFormData) {
        if (values.paymentMethod !== "cash") return;
        const userData : shippingType ={
            shippingAddress:
            {
                city:values.city,
                phone:values.phone,
                details:values.streetAddress,
            }
        }
        const response = await CallCashPaymentAPI( cartUser , userData )

        if (response.status === "success") {
            toast.success("Cash order placed successfully");
            form.reset();
            router.refresh();
            router.push("/allorders")
            return;
        }
        toast.error(response?.message ?? "Cash payment failed");

        


    }

    async function submitCard(values: PaymentFormData) {
        if (values.paymentMethod !== "card") return;
        const userData : shippingType ={
            shippingAddress:
            {
                city:values.city,
                phone:values.phone,
                details:values.streetAddress,
            }
        }
        const response = await CallCashVisaAPI( cartUser , userData )
        if (response.status === "success") {
            const checkoutUrl = response?.session?.url as string | undefined;
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
                return;
            }
            toast.success("Card payment session created");
            router.refresh();
            return;
        }
        toast.error(response?.message ?? "Card payment failed");
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <div className="border-2 border-[#F3F4F6] rounded-2xl ">
                <div className="bg-linear-to-r from-[#16A34A] to-[#15803D] p-3 rounded-t-2xl">
                    <p className="text-white font-medium text-[18px] flex gap-2 items-center"><span><IoHomeSharp /></span>Shipping Address</p>
                    <p className="text-[#DCFCE7] font-medium text-[14px]">Where should we deliver your order?</p>
                </div>
                <div className="p-4">
                    <div className="flex p-4 gap-3 items-center bg-[#DCFCE7] rounded-2xl my-3">
                        <div className="p-2 rounded-full bg-[#DCFCE7]">
                            <RiInformation2Line className="text-[#155DFC]" />

                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[#193CB8] font-medium text-[14px]">Delivery Information</p>
                            <p className="text-[#155DFC] font-medium text-[12px]">Please ensure your address is accurate for smooth delivery</p>
                        </div>
                    </div>
                    {/* city */}
                    <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                    className="text-[#364153] relative font-medium text-[16px]"
                                    htmlFor={field.name}
                                >
                                    City *
                                    <FaCity className="absolute top-13 left-4 w-[15.75px] h-3.5 text-[#6A7282]" />
                                </FieldLabel>
                                <Input
                                    className={`
          mb-3 w-full rounded-md border bg-white px-11 py-6.5! text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent text-[#36415380] font-medium text-[16px]
          ${fieldState.invalid
                                            ? 'border-red-500! focus:border-red-500!'
                                            : 'border-gray-200 focus:border-green-400'
                                        }
        `}{...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="e.g. Cairo, Alexandria, Giza"
                                    autoComplete="off"
                                    type="text"
                                />
                                {fieldState.invalid && <FieldError className="text-red-500 mb-2" errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* streetAddress */}
                    <Controller
                        name="streetAddress"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                    className="text-[#364153] relative font-medium text-[16px]"
                                    htmlFor={field.name}
                                >
                                    Street Address *
                                    <FaLocationDot className="absolute top-13 left-4 w-[15.75px] h-3.5 text-[#6A7282]" />
                                </FieldLabel>
                                <textarea
                                    className={`
          mb-3 w-full rounded-md border bg-white px-11 py-3 text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 focus:ring-transparent text-[#36415380] font-medium text-[16px]
          resize-y min-h-20
          ${fieldState.invalid
                                            ? 'border-red-500! focus:border-red-500!'
                                            : 'border-gray-200 focus:border-green-400'
                                        }
        `}
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Street name, building number, floor, apartment..."
                                    autoComplete="off"
                                    rows={3}
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
                                    className="text-[#364153] relative font-medium text-[16px]"
                                    htmlFor={field.name}
                                >
                                    Phone *
                                    <MdCall className="absolute top-13 left-4 w-[15.75px] h-3.5 text-[#6A7282]" />
                                </FieldLabel>
                                <Input
                                    className={`
          mb-3 w-full rounded-md border bg-white px-11 py-6.5! text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent text-[#36415380] font-medium text-[16px]
          ${fieldState.invalid
                                            ? 'border-red-500! focus:border-red-500!'
                                            : 'border-gray-200 focus:border-green-400'
                                        }
        `}{...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="01xxxxxxxxx"
                                    autoComplete="off"
                                    type="text"
                                />
                                {fieldState.invalid && <FieldError className="text-red-500 mb-2" errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />


                </div>
            </div>


            <div className="border-2 border-[#F3F4F6] rounded-2xl ">
                <div className="bg-linear-to-r from-[#16A34A] to-[#15803D] p-3 rounded-t-2xl">
                    <p className="text-white font-medium text-[18px] flex gap-2 items-center"><span><FaCreditCard /></span>Payment Method</p>
                    <p className="text-[#DCFCE7] font-medium text-[14px]">Choose how you&apos;d like to pay</p>
                </div>
                <div className="p-4">
                    <div className="flex w-full flex-col items-center gap-6 px-4 py-6">
                        <section className="flex w-full min-w-[320px] flex-col gap-4">
                            <Controller
                                name="paymentMethod"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <RadioGroup
                                            value={field.value}
                                            onChange={(v) => field.onChange(v as PaymentFormData["paymentMethod"])}
                                            className="flex w-full flex-col gap-2"
                                        >
                                            {addOns.map((addon) => (
                                                <Radio
                                                    key={addon.value}
                                                    value={addon.value}
                                                    className={clsx(
                                                        "group relative flex-col gap-4 rounded-3xl bg-white border-2 border-[#E5E7EB] px-5 py-4 transition-all",
                                                        "data-[selected=true]:bg-accent/10",
                                                    )}
                                                >
                                                    <Radio.Control className="absolute top-3 right-4 size-5 rounded-full before:rounded-full">
                                                        <Radio.Indicator />
                                                    </Radio.Control>
                                                    <Radio.Content className="flex flex-row items-start justify-start gap-4">
                                                        <addon.icon className="size-5 text-accent" />
                                                        <div className="flex flex-col gap-1">
                                                            <Label>{addon.title}</Label>
                                                            <Description>{addon.description}</Description>
                                                        </div>
                                                    </Radio.Content>
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                        {fieldState.invalid && (
                                            <FieldError className="text-red-500 mt-2" errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </section>

                        <div className="flex w-full min-w-[320px] flex-col gap-3 sm:flex-row">
                            <Button
                                type="button"
                                disabled={paymentMethod !== "cash"}
                                className="flex-1 disabled:cursor-not-allowed! cursor-pointer rounded-xl bg-linear-to-r from-[#16A34A] to-[#15803D] py-6 text-[16px] font-semibold text-white disabled:opacity-40"
                                onClick={() => void form.handleSubmit(submitCash)()}
                            >
                                <BsCash className="mr-2 size-5" />
                                Pay with cash
                            </Button>
                            <Button
                                type="button"
                                disabled={paymentMethod !== "card"}
                                className="flex-1 disabled:cursor-not-allowed! cursor-pointer rounded-xl bg-linear-to-r from-[#16A34A] to-[#15803D] py-6 text-[16px] font-semibold text-white disabled:opacity-40"
                                onClick={() => void form.handleSubmit(submitCard)()}
                            >
                                <FaCreditCard className="mr-2 size-5" />
                                Pay with card
                            </Button>
                        </div>
                    </div>


                </div>




            </div>




        </form>
    );
}
