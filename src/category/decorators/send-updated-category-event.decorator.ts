import { UPDATE_CATEGORY_EVENT } from '../../constants';

export function SendUpdatedCategoryEvent() {
  return (target: any, property: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function (...params) {
      const result = await original.apply(this, params);
      this.eventService.emit(UPDATE_CATEGORY_EVENT, result);
      return result;
    };
    return descriptor;
  };
}
