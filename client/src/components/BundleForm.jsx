import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { orderFormSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SuccessModal from "./SuccessModal";

const BundleForm = ({ network, bundles, momoNetworks }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      recipientNumber: "",
      bundleId: "",
      momoNetwork: "",
      momoWallet: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Example API call (implement this endpoint on the backend)
      await apiRequest("POST", "/api/orders", {
        ...data,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      
      setShowSuccessModal(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your order. Please try again.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Phone number input handler to restrict to digits only
  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) {
      e.target.value = value.slice(0, 10);
    } else {
      e.target.value = value;
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="recipientNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. 07X XXX XXXX"
                    onInput={handlePhoneInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bundleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Bundle</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a data bundle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bundles.map((bundle) => (
                      <SelectItem key={bundle.id} value={bundle.id}>
                        {bundle.duration} - {bundle.data} - ${bundle.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="momoNetwork"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Momo Network</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {momoNetworks.map((network) => (
                      <SelectItem key={network.id} value={network.id}>
                        {network.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="momoWallet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Momo Wallet Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. 07X XXX XXXX"
                    onInput={handlePhoneInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-black hover:bg-gray-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Checkout"}
          </Button>
        </form>
      </Form>

      {showSuccessModal && (
        <SuccessModal
          open={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            form.reset();
          }}
        />
      )}
    </>
  );
};

export default BundleForm;
