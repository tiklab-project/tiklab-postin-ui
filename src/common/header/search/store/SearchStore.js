import { observable,  action  } from "mobx";

export class SearchStore {
    @observable showSearch = false;

    @action
    setShowSearch = (value) => {
        this.showSearch = value;
    }

}
let searchStore =new SearchStore();
export default searchStore;