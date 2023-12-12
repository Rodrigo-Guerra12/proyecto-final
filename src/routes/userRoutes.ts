import express, { Request, Response } from "express";
import Model from "../models/userModel";

const router = express.Router();

// Post Method
router.post("/prueba", async (req: Request, res: Response) => {
  try {
    const data = new Model({
      q: { required: true, type: String },
    });
    console.log("data ", data);
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Get all Method
router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get by ID Method
router.get("/getOne/:id", async (req: Request, res: Response) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update by ID Method
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Delete by ID Method
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
