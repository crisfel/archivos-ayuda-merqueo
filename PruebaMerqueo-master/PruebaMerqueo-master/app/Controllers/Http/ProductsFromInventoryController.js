'use strict'

class OneController {
    Check_product(id,Obj)//Check if product exists in the structure
    {
        var index=0
        var aux=0
        for(var i = 0; i < Obj.length; i++)
        {
            if(Obj[i].product_id == id)
            {
                aux++
                index=i
            }
        }
        if(aux==0)
        {
            //Not Found
            return 0
        }else
        {
            //Founded
            return index
        }
    }
    
    async index ({ request, response }) {
        
        const Order = use("App/Models/Order")
        const OrdersProducts = use("App/Models/OrdersProducts")
        const Product = use("App/Models/Product")
        const Inventory = use("App/Models/Inventory")

        const Rta = {}
        Rta.status=200
        Rta.message="Consultar qué productos y qué cantidad puede ser alistada desde el inventario"
        Rta["data"]=[]        

        const orders = await Order.query().orderBy('priority', 'asc').fetch()
        for (const order of orders.toJSON()) {
            //console.log("------------------------------")
            //console.log("order id: "+order.id)
            const ordersproducts= await OrdersProducts.query().where('order_id', '=', order.id).fetch()
            for(const op of ordersproducts.toJSON())
            {
                //await console.log("   I need the product id: "+op.product_id+" - "+op.quantity+" units")
                var index=this.Check_product(op.product_id,Rta.data)                
                if(index!=0)//If product Exists in the structure
                {
                    Rta.data[index].require = Rta.data[index].require+op.quantity
                    const inventory = await Inventory.find(op.product_id)
                    if(inventory.quantity>=Rta.data[index].require)
                    {
                        Rta.data[index].available = true
                    }else
                    {
                        Rta.data[index].available = false
                        Rta.data[index].missing = Rta.data[index].require-inventory.quantity
                    }
                }else
                {
                    try{
                        const inventory = await Inventory.find(op.product_id)
                        const product = await Product.find(op.product_id)
                        const data={}
                        data.product_id=op.product_id
                        data.name=product.name
                        data.require= op.quantity
                        data.in_stock= inventory.quantity
                        if(data.in_stock>=op.quantity)
                        {
                            data.available = true
                        }else
                        {
                            data.available = false
                            data.missing = op.quantity-inventory.quantity
                        }
                        Rta.data.push(data)
                    }
                    catch(error)
                    {
                        //console.log(error)
                    }
                }
            }
        }
        return Rta
    }
}

module.exports = OneController
