import { Router } from 'express';
import Property from '../controllers/property';
import { checkToken } from '../middleware/handleToken';

const router = Router();

router.post('/',checkToken, Property.addProperty);
router.patch('/:propertyId', checkToken,Property.updateProperty);
router.patch('/:propertyId/sold', checkToken, Property.markSold);
router.delete('/:propertyId', checkToken, Property.deleteProperty);
router.get('/', Property.getAllProperty);
router.get('/:propertyId', Property.getAllProperty);


export default router;