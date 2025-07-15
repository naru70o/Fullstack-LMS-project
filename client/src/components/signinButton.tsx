import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/components/ui/dialog"
import { Button } from './ui/button'
import { Input } from './ui/input'
import Image from 'next/image'
import Facebook from "@/components/../public/assets/Facebook-auth.svg"
import Link from 'next/link'
export const SigninButton = () => {
  return (
    <Dialog>
        <form>
            <DialogTrigger asChild>
                <button className="text-xl py-3 px-8 rounded-[8px] text-center bg-[var(--primary-color)] text-white font-bold">
                    Sign In
                </button>
            </DialogTrigger>
            <DialogContent className='grid grid-cols-2 max-w-[800px] min-w-[800px] rounded-md text-popover-foreground overflow-hidden border-none bg-[var(--surface-light)]'>
                <div className='col-start-1 relative'>
                    <Image src="/assets/sign-image.jpg" alt="Sign In" className='absolute' fill/>
                </div>
                <div className='col-start-2 lex flex-col items-center justify-center gap-4 px-6 py-8'>
                <DialogHeader>
                    <DialogTitle><Image src="/assets/logoNav.svg" alt="Logo" width={144} height={34} /></DialogTitle>
                    <DialogDescription className='text-popover-foreground/60 font-poppins text-[16px] not-italic font-normal leading-[20px]'>
                       Join us and get more benefits. We promise to keep your data safely. 
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 mt-3">
                    <div className="grid gap-3">
                        <Input id="email" name="email" type="email" placeholder='email address' required className='border-none bg-popover/90 shadow-none text-popover-foreground/90 py-6 rounded-sm'/>
                    </div>
                    <div className="grid gap-3">
                        <Input className='py-6 border-none bg-popover/90 shadow-none text-popover-foreground/30 rounded-sm' id="password" name="password" type="password" required placeholder="password"/>
                    </div>
                    <Button variant="primary" size="md" className='w-full bg-[var(--primary-color)] text-white font-bold hover:bg-[var(--primary-color)]/90'>Sign In</Button>
                    <p className='text-popover-foreground text-center font-poppins text-[14px] font-normal leading-[18px]'>or you can</p>
                    {/* Login Providers */}
                    <div className='flex flex-col items-center justify-center gap-4 font-bold font-poppins'>
                        <Button variant="facebook" size="md" className='w-full bg-[#4267b2] hover:bg-none text-white hover:text-white/70 transition-all rounded-xl flex items-center'><span className='mr-2'><Image src="/assets/Facebook-auth.svg" alt="Facebook" width={20} height={20} /></span>Sign in with Facebook</Button>
                        <Button size="md" className='w-full bg-popover/90 text-popover-foreground/90 hover:bg-popover/80 rounded-xl flex items-center'><span className='mr-2'><Image src="/assets/Google.svg" alt="GitHub" width={20} height={20} /></span>Sign in with Google</Button>  
                    </div>
                    {/* need an Account?Sign Up */}
                    <p className='text-popover-foreground text-center font-poppins text-[14px] font-normal leading-[18px]'>Need an account? <Link href="#" className='text-[var(--primary-color)] hover:underline font-bold'>Sign Up</Link></p>
                </div>
                {/* <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Sign In</Button>
                </DialogFooter> */}
                </div>
            </DialogContent>
        </form>
    </Dialog>
    // <button className="text-xl py-3 px-8 rounded-[8px] text-center bg-[var(--primary-color)] text-white font-bold">Sign Up</button>
  )
}

// export function DialogDemo() {
//   return (
//     <Dialog>
//       <form>
//         <DialogTrigger asChild>
//           <Button variant="outline">Open Dialog</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit profile</DialogTitle>
//             <DialogDescription>
//               Make changes to your profile here. Click save when you&apos;re
//               done.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="name-1">Name</Label>
//               <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="username-1">Username</Label>
//               <Input id="username-1" name="username" defaultValue="@peduarte" />
//             </div>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   )
// }
