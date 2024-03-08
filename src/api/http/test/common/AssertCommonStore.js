import {action} from "mobx";
import jsonPath from "../../../../common/utils/jsonPath";
import {assertCompare} from "../../../../common/dictionary/dictionary";

export class AssertCommonStore{

    //总的断言判断
    @action
    assertIsOrNotSuccess = (data) =>{
        let listResult ;
        if(data.assertList&&data.assertList>0){
            listResult=this.assertCompare(data)
        }

        if(listResult === -1){
            return -1;
        }else if(data.status !== 200){
            return -1;
        } else{
            return 1;
        }
    }

    //判断断言list中，只要有一个为-1，则为-1.
    @action
    assertCompare = (assertNeedData)=>{
        const {assertList}=assertNeedData;

        let result;
        let itemResult =[];
        //获取所有断言是否通过
        itemResult = assertList&&assertList.map((item)=>{
            itemResult =this.assertSwitch(item,assertNeedData)
            item.result =itemResult//添加字段，用于测试结果的断言，结果的回显 1：成功，-1失败

            return itemResult;
        })

        //如果有一个失败，定为失败
        if(itemResult.includes(-1)){
            result=-1
        }else {
            result = 1
        }

        return result
    }


    @action
    assertSwitch=(item,assertNeedData)=>{
        switch (item.source){
            case 1:
                return this.assertStatusCommon(assertNeedData.status,item);
            case 2:
                return this.assertHeaderCompare(assertNeedData.header,item)
            case 3:
                return this.assertBodyCompare(assertNeedData.body,item)
        }
    }

    //比较两个值是否相同
    @action
    compareEqual=(value,itemValue)=>{
        if(String(value) === itemValue){
            return 1
        }else{
            return -1
        }
    }

    // 大于
    @action
    compareGreaterThan=(value,itemValue)=>{
        if(String(value) > itemValue){
            return 1
        }else{
            return -1
        }
    }

    // 小于
    @action
    compareLessThan=(value,itemValue)=>{
        if(String(value) < itemValue){
            return 1
        }else{
            return -1
        }
    }

    // 大于等于
    @action
    compareGreaterThanEqual=(value,itemValue)=>{
        if(String(value) >= itemValue){
            return 1
        }else{
            return -1
        }
    }

    // 小于等于
    @action
    compareLessThanEqual=(value,itemValue)=>{
        if(String(value) <= itemValue){
            return 1
        }else{
            return -1
        }
    }



    @action
    assertStatusCommon=(status,item)=>{

        if(item.propertyName==="status"){
            switch (item.comparator) {
                case assertCompare.EQUAL:
                    return this.compareEqual(status,item.value);
                case assertCompare.GREATER_THAN:
                    return this.compareGreaterThan(status,item.value)
                case assertCompare.LESS_THAN:
                    return this.compareLessThan(status,item.value)
                case assertCompare.GREATER_THAN_EQUAL:
                    return this.compareGreaterThanEqual(status,item.value)
                case assertCompare.LESS_THAN_EQUAL:
                    return this.compareLessThanEqual(status,item.value)
                default:
                    return -1
            }

        }else {
            return -1
        }
    }

    //请求头比较
    @action
    assertHeaderCompare = (header,item)=>{
        if(header.hasOwnProperty(item.propertyName)){
            let headersValue = header[item.propertyName];
            return this.compareEqual(headersValue,item.value);
        }else{
            return -1
        }
    }

    //请求体比较
    @action
    assertBodyCompare = (body,item) =>{
        let badyValue = jsonPath(body, `$.${item.propertyName}`) .toString();

        if(badyValue === 'false'){
            return -1
        }else{
            return this.compareEqual(badyValue,item.value);
        }
    }
}