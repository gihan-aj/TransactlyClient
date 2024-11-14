export interface CategoryResponseInterface {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

// can have string operators
type GUID = string & { isGuid: true };
function guid(guid: string): GUID {
  // validation
  return guid as GUID;
}
