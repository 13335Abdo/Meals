"use client"
import { LoaderCircle } from "lucide-react";
import { FaPlus } from "react-icons/fa6";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import AddProdectAPIServer from "../shop/AddProdectAPIServer";
import { finalContext } from "../_contexts/Ncontext";

interface AddProductTocardButtonProps {
  id: string;
  label?: string;
  className?: string;
}

export default function AddProductTocardButton({
  id,
  label,
  className,
}: AddProductTocardButtonProps) {
  const { setNavCartNo, settotalCartPrice, setProdects, setcartUser } =
    useContext(finalContext);
  const [isPending, setIsPending] = useState(false);

  async function handeCallApi() {
    try {
      setIsPending(true);
      const x = await AddProdectAPIServer(id);
      toast.success(x.status, { richColors: true, position: "top-center" });
      setNavCartNo(x.numOfCartItems);
      setcartUser(x.cartId);
      settotalCartPrice(x.data.totalCartPrice);
      setProdects(x.data.products);
    } catch {
      toast.error("Unable to add this item right now.", {
        richColors: true,
        position: "top-center",
      });
    } finally {
      setIsPending(false);
    }
  }

  const iconOnly = !label;

  return (
    <button
      type="button"
      onClick={handeCallApi}
      disabled={isPending}
      aria-label={label ?? "Add product to cart"}
      className={cn(
        "inline-flex items-center justify-center gap-2 bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70",
        iconOnly ? "rounded-full p-2.5" : "rounded-xl px-4 py-2.5 text-sm font-semibold",
        className
      )}
    >
      {isPending ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <FaPlus className={iconOnly ? "" : "text-xs"} />
      )}
      {label ? <span>{isPending ? "Adding..." : label}</span> : null}
    </button>
  );
}
