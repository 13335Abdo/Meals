"use client";

import {
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
    MenuIcon,
    SearchIcon,
    XIcon,
    HeartIcon,
    ShoppingCartIcon,
    HeadphonesIcon,
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";

import logo from "@/images/a.shrink-0.png";
import logoimg from "@/images/7be87acff8878d0ff905ef9dcd5bf7d2fd7a6c6f.png";
import { finalContext } from "../_contexts/Ncontext";

const components: { title: string; href: string }[] = [
    { title: "All categories", href: "/categories" },
];

export default function Navbar() {
    const {NavCartNo ,NavWishNo} = useContext(finalContext)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [categoriesOpen, setCategoriesOpen] = React.useState(false);
    const { data: session } = useSession();
    

    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: "/signin" })
        console.log("Logout clicked");
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <img src={logo.src} alt="FreshCart" className="h-8 w-auto" />

                </Link>

                {/* Desktop Search */}
                <div className="hidden md:flex relative flex-1 max-w-md mx-4">
                    <input
                        type="text"
                        placeholder="Search for products, brands and more..."
                        className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-5 pr-12 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-green-500 p-2 text-white hover:bg-green-600 transition">
                        <SearchIcon size={16} />
                    </button>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                    <NavigationMenu>
                        <NavigationMenuList className="flex items-center gap-1">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/home" className="text-gray-700 hover:text-green-600 transition">
                                        Home
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/shop" className="text-gray-700 hover:text-green-600 transition">
                                        Shop
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-gray-700 hover:text-green-600 transition">
                                    Categories
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-50 bg-white gap-1 p-2">
                                        {components.map((item, idx) => (
                                            <NavigationMenuLink asChild key={idx}>
                                                <Link
                                                    href={item.href}
                                                    className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-transparent hover:text-green-600 transition"
                                                >
                                                    {item.title}
                                                </Link>
                                            </NavigationMenuLink>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/brands" className="text-gray-700 hover:text-green-600 transition">
                                        Brands
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link
                                        href="/support"
                                        className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition"
                                    >
                                        <HeadphonesIcon size={18} />
                                        <div className="hidden xl:block">
                                            <p className="text-sm">Support</p>
                                            <p className="text-xs text-green-500">24/7 Help</p>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/wishlist" className="text-gray-700 hover:text-green-600 transition relative">
                                        <HeartIcon size={18} />
                                        <span className="text-white bg-red-500 w-4.5 h-4.5 flex justify-center items-center rounded-full absolute -top-1 right-0">
                                            {NavWishNo}
                                        </span>
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link href="/cart" className="text-gray-700 hover:text-green-600 transition relative">
                                        <ShoppingCartIcon size={18} />
                                        <span className="text-white bg-[#16A34A] w-4.5 h-4.5 flex justify-center items-center rounded-full absolute -top-1 right-0">
                                            {NavCartNo}
                                        </span>
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            {session ? (
                                <NavigationMenuItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                                <Avatar className="h-8 w-8 cursor-pointer">
                                                    <AvatarImage src={logoimg.src} alt="avatar" />
                                                    <AvatarFallback>U</AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56 bg-white mt-4" align="end">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <BadgeCheckIcon className="mr-2 h-4 w-4" />
                                                    <span>Account</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <CreditCardIcon className="mr-2 h-4 w-4" />
                                                    <span>Billing</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <BellIcon className="mr-2 h-4 w-4" />
                                                    <span>Notifications</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={handleLogout}
                                                className="text-red-500! cursor-pointer hover:bg-red-500! hover:text-white!"
                                            >
                                                <LogOutIcon className="mr-2 h-4 w-4" />
                                                <span>Sign Out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </NavigationMenuItem>
                            ) : (
                                <>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link
                                                href="/signin"
                                                className="text-green-600 hover:text-green-700 font-medium transition"
                                            >
                                                Sign In
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/signup"
                                                className="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition"
                                            >
                                                Sign Up
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </>
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="block rounded-md p-2 text-gray-700 hover:bg-green-50 lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-16 z-40 bg-white! backdrop-blur-sm lg:hidden">
                    <div className="container mx-auto px-4 py-6 space-y-6 bg-white!">
                        {/* Mobile Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-5 pr-12 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-green-500 p-2 text-white hover:bg-green-600">
                                <SearchIcon size={16} />
                            </button>
                        </div>

                        {/* Mobile Navigation Links */}
                        <div className="flex flex-col space-y-2">
                            <MobileLink href="/home" onClick={() => setMobileMenuOpen(false)}>
                                Home
                            </MobileLink>
                            <MobileLink href="/shop" onClick={() => setMobileMenuOpen(false)}>
                                Shop
                            </MobileLink>

                            {/* Categories Dropdown */}
                            <div className="relative">
                                <button
                                    className="flex w-full items-center justify-between py-2 text-gray-700 hover:text-green-600 transition"
                                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                                >
                                    <span>Categories</span>
                                    <ChevronDownIcon
                                        className={`h-4 w-4 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {categoriesOpen && (
                                    <div className="mt-2 pl-4 space-y-1">
                                        {components.map((comp, idx) => (
                                            <MobileLink
                                                key={idx}
                                                href={comp.href}
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    setCategoriesOpen(false);
                                                }}
                                            >
                                                {comp.title}
                                            </MobileLink>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <MobileLink href="/brands" onClick={() => setMobileMenuOpen(false)}>
                                Brands
                            </MobileLink>
                            <MobileLink href="/support" onClick={() => setMobileMenuOpen(false)}>
                                <div className="flex items-center gap-2">
                                    <HeadphonesIcon size={18} />
                                    <span>Support</span>
                                </div>
                            </MobileLink>

                            <div className="flex items-center gap-4 py-2">
                                <MobileLink href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                                    <HeartIcon size={20} />
                                </MobileLink>
                                <MobileLink href="/cart" onClick={() => setMobileMenuOpen(false)}>
                                    <ShoppingCartIcon size={20} />
                                </MobileLink>
                            </div>

                            {/* Mobile Auth Section */}
                            <div className="pt-4 border-t border-gray-100">
                                {session ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={logoimg.src} alt="avatar" />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{session.user?.name || "User"}</p>
                                                <p className="text-sm text-gray-500">{session.user?.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout} //_________________________________________________________
                                            className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-md border border-red-200 bg-red-50 py-2 text-red-600 hover:bg-red-100 transition"
                                        >
                                            <LogOutIcon size={18} />
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href="/signin"
                                            className="flex items-center justify-center rounded-md border border-green-200 bg-white py-2 text-green-600 hover:bg-green-50 transition"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="flex items-center justify-center rounded-md bg-green-600 py-2 text-white hover:bg-green-700 transition"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

function MobileLink({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            className="block py-2 text-gray-700 hover:text-green-600 transition"
            onClick={onClick}
        >
            {children}
        </Link>
    );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
}