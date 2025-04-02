import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Routes for networks
  app.get("/api/networks", (req, res) => {
    const networks = [
      {
        id: "mtn",
        name: "MTN",
        slogan: "data",
        logo: "mtn"
      },
      {
        id: "at",
        name: "AT",
        slogan: "life is simple",
        logo: "at"
      },
      {
        id: "telecell",
        name: "Telecell",
        slogan: "",
        logo: "telecell"
      }
    ];
    res.json(networks);
  });

  // Route for bundles by network
  app.get("/api/networks/:id/bundles", (req, res) => {
    const networkId = req.params.id;
    const bundles = {
      mtn: [
        { id: "mtn-daily-100mb", networkId: "mtn", data: "100MB", duration: "Daily", price: "0.50", code: "daily-100mb" },
        { id: "mtn-weekly-500mb", networkId: "mtn", data: "500MB", duration: "Weekly", price: "2.00", code: "weekly-500mb" },
        { id: "mtn-monthly-1gb", networkId: "mtn", data: "1GB", duration: "Monthly", price: "5.00", code: "monthly-1gb" },
        { id: "mtn-monthly-5gb", networkId: "mtn", data: "5GB", duration: "Monthly", price: "20.00", code: "monthly-5gb" },
        { id: "mtn-monthly-10gb", networkId: "mtn", data: "10GB", duration: "Monthly", price: "35.00", code: "monthly-10gb" }
      ],
      at: [
        { id: "at-daily-200mb", networkId: "at", data: "200MB", duration: "Daily", price: "0.60", code: "daily-200mb" },
        { id: "at-weekly-700mb", networkId: "at", data: "700MB", duration: "Weekly", price: "2.50", code: "weekly-700mb" },
        { id: "at-monthly-2gb", networkId: "at", data: "2GB", duration: "Monthly", price: "8.00", code: "monthly-2gb" },
        { id: "at-monthly-6gb", networkId: "at", data: "6GB", duration: "Monthly", price: "22.00", code: "monthly-6gb" },
        { id: "at-monthly-15gb", networkId: "at", data: "15GB", duration: "Monthly", price: "40.00", code: "monthly-15gb" }
      ],
      telecell: [
        { id: "telecell-daily-150mb", networkId: "telecell", data: "150MB", duration: "Daily", price: "0.55", code: "daily-150mb" },
        { id: "telecell-weekly-800mb", networkId: "telecell", data: "800MB", duration: "Weekly", price: "2.70", code: "weekly-800mb" },
        { id: "telecell-monthly-1.5gb", networkId: "telecell", data: "1.5GB", duration: "Monthly", price: "7.00", code: "monthly-1.5gb" },
        { id: "telecell-monthly-5gb", networkId: "telecell", data: "5GB", duration: "Monthly", price: "19.00", code: "monthly-5gb" },
        { id: "telecell-monthly-12gb", networkId: "telecell", data: "12GB", duration: "Monthly", price: "38.00", code: "monthly-12gb" }
      ]
    };
    
    if (!bundles[networkId]) {
      return res.status(404).json({ message: "Network not found" });
    }
    
    res.json(bundles[networkId]);
  });

  // Route for payment networks
  app.get("/api/payment-networks", (req, res) => {
    const paymentNetworks = [
      { id: "mtn", name: "MTN Mobile Money" },
      { id: "airtel", name: "Airtel Money" },
      { id: "telecell", name: "Telecell Cash" }
    ];
    res.json(paymentNetworks);
  });

  // Route to create an order
  app.post("/api/orders", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertOrderSchema.parse(req.body);
      
      // Process the order - in a real app, you would integrate with payment gateway
      // For demo, we'll just return success
      
      res.status(201).json({ 
        success: true, 
        message: "Order created successfully",
        orderId: Date.now().toString()
      });
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid order data"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
