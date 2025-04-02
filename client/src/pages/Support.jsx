import { Phone, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Support = () => {
  const contactOptions = [
    {
      id: "phone",
      title: "Call Us",
      description: "Speak directly with our customer support team",
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      action: "Call Now",
      actionFn: () => window.location.href = "tel:+1234567890", // Replace with actual phone number
      color: "bg-blue-50"
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      description: "Chat with us on WhatsApp for quick assistance",
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      action: "Open WhatsApp",
      actionFn: () => window.open("https://wa.me/1234567890", "_blank"), // Replace with actual WhatsApp number
      color: "bg-green-50"
    }
  ];

  return (
    <div className="py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Need Help? We're Here For You
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500">
            Contact our support team through any of the options below
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-8">
          {contactOptions.map((option) => (
            <Card key={option.id} className="overflow-hidden shadow-lg border-0">
              <div className={`p-6 ${option.color}`}>
                <div className="flex items-center">
                  {option.icon}
                  <CardTitle className="ml-3 text-xl">{option.title}</CardTitle>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">{option.description}</p>
                <Button 
                  className="w-full" 
                  onClick={option.actionFn}
                  variant={option.id === "whatsapp" ? "outline" : "default"}
                >
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">How do I activate my data bundle?</h3>
              <p className="mt-2 text-gray-600">Your data bundle is automatically activated after successful purchase. You should receive a confirmation message within a few minutes.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">What happens if my data bundle doesn't activate?</h3>
              <p className="mt-2 text-gray-600">If your data bundle isn't activated within 30 minutes, please contact our support team with your transaction details.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Can I transfer my data bundle to someone else?</h3>
              <p className="mt-2 text-gray-600">No, data bundles cannot be transferred once purchased. You should input the recipient's number during checkout.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Do data bundles expire?</h3>
              <p className="mt-2 text-gray-600">Yes, data bundles expire based on their specified duration (daily, weekly, or monthly) from the time of activation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;