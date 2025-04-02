import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

const SuccessModal = ({ open, onClose }) => {
  const [_, setLocation] = useLocation();
  
  const handleBackToHome = () => {
    onClose();
    setLocation("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <AlertDialogTitle>Order Successful</AlertDialogTitle>
          <AlertDialogDescription>
            Your data bundle purchase was successful. You will receive a confirmation message shortly.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button className="w-full bg-black hover:bg-gray-800" onClick={handleBackToHome}>
            Back to Home
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessModal;
