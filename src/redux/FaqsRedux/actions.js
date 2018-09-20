import { makeCRUDConstantCreator, makeCRUDActionsCreator } from '../crudCreator/actions';

export const MODEL = 'faqs';
export const IGNORE_ACTIONS = ['GET_ONE', 'DELETE', 'EDIT', 'CREATE'];
export const FaqsTypes = {
  ...makeCRUDConstantCreator(MODEL, IGNORE_ACTIONS),
};
const CRUDFaqsActions = makeCRUDActionsCreator(MODEL, IGNORE_ACTIONS);
/**
 * getAllFaqs({pageSize, page })
 * getOneFaqs(data)
 * createFaqs(data)
 * deleteFaqs()
 * editFaqs(data)
 */
export default { ...CRUDFaqsActions };
