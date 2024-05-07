'use strict'

class NewInventoryController {
    Check_inventory(Obj,id)//Método que calcula la posición de un producto en el inventario
    {
        var index=-404
        for(var i = 0; i < Obj.length; i++)
        {
            if(Obj[i].id == id)
            {
                index=i
                break
            }
        }
        return index
    }
    async index({request, response})
    {
        const Rta={}
        Rta.status=200
        Rta.message="Calcular el inventario del día 2 de marzo, teniendo en cuenta los pedidos despachados el 1 de marzo."
        Rta["data"]={}
        const data={}
        data["inventory"]=[]

        const Rta2={}
        Rta2["inventory"]=[]
        //Rta2.inventory=[]
        const inventory=[]
        
        const Id=request.input('Id')

        const Order = use("App/Models/Order")
        const OrdersProducts = use("App/Models/OrdersProducts")
        const Product = use("App/Models/Product")
        const Provider = use("App/Models/Provider")
        const Inventory = use("App/Models/Inventory")

        //Calculo el inventario del 1ro de marzo
        const inventoryo= await Inventory.all()
        for(const inv of inventoryo.toJSON())
        {
            var inventory2={}
            inventory2.quantity=inv.quantity
            //inventory2.date=this.Format_date(inv.date)
            inventory2.date="2019-03-02"//Actualizamos a la nueva fecha de una vez
            inventory2.id=inv.product_id
            inventory.push(inventory2)
        }
        Rta2.inventory=inventory

        //Itero sobre las ordenes del primero de marzo para recalcular el inventario para mañana 2 de marzo
        const orders = await Order.query().where("deliveryDate","=","2019-03-01").orderBy('priority', 'asc').fetch()
        for(const order of orders.toJSON())
        {
            const ordersproducts= await OrdersProducts.query().where('order_id','=',order.id).fetch()
            for(const op of ordersproducts.toJSON())
            {
                const inventoryo= await Inventory.query().where("product_id",'=',op.product_id).fetch()
                var index=this.Check_inventory(inventory,op.product_id)
                if(index==-404)//Si el producto no se encuentra continua
                {
                    continue
                }
                var new_quantity=inventory[index].quantity-op.quantity
                if(new_quantity<=0)
                {
                    //new_quantity=0    
                    inventory.splice(index,1)
                }else
                {
                    inventory[index].quantity=new_quantity
                }
            }
        }
        Rta2.inventory=inventory
        Rta.data=Rta2
        return Rta
    }
}

module.exports = NewInventoryController
