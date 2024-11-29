import express from 'express';
import multer from 'multer';
import { LensService } from '../services/LensService';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configura multer para subir archivos a una carpeta temporal

const lensService = new LensService();

router.post('/uploadLens', upload.single('image'), async (req, res) => {
      try {
            const imageUrl = await lensService.uploadFile(req.file);
            console.log(imageUrl);
            const jsonData = await lensService.getJsonData(imageUrl);
            console.log(jsonData);
            res.status(200).json({ data: jsonData, imagen: imageUrl });
      } catch (error) {
            res.status(500).json({ error: 'Error al procesar la imagen' });
      }
});

export default router;
