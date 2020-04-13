const LEDGER_TABLE='ledger';

class ledgerService {
    constructor(sqlService) {
        this.sqlService=sqlService;
    }
    async getTransactions(budget_id){
        try{
            let result= await this.sqlService.readTableWithCondition(LEDGER_TABLE,'budget_id',budget_id);
            return result.map(({id,data})=>{return {id,...data}});
        } catch(e){
            console.log({class:"ledgerService",method:"getTransactions",error:e});
        }
    }
    async getTransaction(id){
        try{
            let result= await this.sqlService.readTableWithId(LEDGER_TABLE,id);
            return result.map(({id,data})=>{return {id,...data}});
        } catch(e){
            console.log({class:"ledgerService",method:"getTransactions",error:e});
        }
    }
    async addNewTransaction(payload){
        try{
            let result= await this.sqlService.insertItem(LEDGER_TABLE, payload);
            return result;
        } catch(e){
            console.log({class:"ledgerService",method:"addNewTransaction",error:e});
        }
    }
    async updateTransaction(id,payload){
        
        try{
            let result= await this.sqlService.updateItem(LEDGER_TABLE, JSON.stringify(payload), 'id', id);
            return result;
        } catch(e){
            console.log({class:"ledgerService",method:"updateTransaction",error:e});
        }
    }
    async deleteTransaction(id){
        try{
            let result= await this.sqlService.deleteItemWithId(LEDGER_TABLE, id);
            return result;
        } catch(e){
            console.log({class:"ledgerService",method:"deleteTransaction",error:e});
        }
    }
    async deleteTransactionByPlanId(id){
        try{
            let result= await this.sqlService.deleteItemWithCondition(LEDGER_TABLE,'budget_id', id);
            return result;
        } catch(e){
            console.log({class:"ledgerService",method:"deleteItemWithCondition",error:e});
        }
        
    }
}

module.exports = ledgerService;