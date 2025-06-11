import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const SignInModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            Enter your credentials below to access your account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </div>
        <DialogFooter>
          <div className="w-full ">
            <p className="text-start w-full py-2.5 text-gray-500 text-sm cursor-pointer hover:underline-offset-4 hover:underline">
              Don't have an account?
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 sm:justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="cursor-pointer"
                >
                  Close
                </Button>
              </DialogClose>
              <Button>Sign in</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
