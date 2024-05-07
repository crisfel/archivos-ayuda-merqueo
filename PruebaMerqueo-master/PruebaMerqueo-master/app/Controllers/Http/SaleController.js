'use strict'

class SaleController {
    
    Check_sales(Obj,id)
    {
        var index=0
        for(var i = 0; i < Obj.length; i++)
        {
            if(Obj[i].product_id == id)
            {
                index=i
                break
            }
        }
        return index
    }
    /*Format_date(d)
    {
        d= new Date(d);
        var datestring = d.getFullYear()+"-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2)
        return datestring
    }*/
    Sort_products(Obj,param)
    {
        for(var j=0; j<Obj.length;j++)
        {
            for(var i=0; i<Obj.length-1;i++)
            {
                if(param=="asc")
                {
                    if(Obj[i].quantity>Obj[i+1].quantity)
                    {
                        var auxobj=Obj[i]
                        Obj[i]=Obj[i+1]
                        Obj[i+1]=auxobj
                    }
                }else if(param=="desc")
                {
                    if(Obj[i].quantity<Obj[i+1].quantity)
                    {
                        var auxobj=Obj[i]
                        Obj[i]=Obj[i+1]
                        Obj[i+1]=auxobj
                    }
                }
            }
        }
        return Obj
    }
    async worst({request, response}){
        const Rta={}
        Rta.status=200
        Rta.message="Productos menos vendidos el día 1 de marzo."
        Rta["data"]=[]
        const sales={}
        sales["data"]=[]

        const date=request.input('deliveryDate')

        const Order = use("App/Models/Order")
        const OrdersProducts = use("App/Models/OrdersProducts")
        const Product = use("App/Models/Product")
        const Provider = use("App/Models/Provider")
        const Inventory = use("App/Models/Inventory")

        const orders = await Order.query().where('deliveryDate', '=', date).orderBy('priority', 'asc').fetch()

        for (const order of orders.toJSON()) {
            //if(this.Format_date(order.deliveryDate)==date)
            if(order.deliveryDate==date)
            {
                const ordersproducts= await OrdersProducts.query().where('order_id', '=', order.id).fetch()
                for(const op of ordersproducts.toJSON())
                {
                    const product= await Product.find(op.product_id)
                    var data={}
                    data.product_id=op.product_id
                    data.name=product.name
                    data.quantity=op.quantity
                    var index=this.Check_sales(sales.data,data.product_id)
                    if(index==0)//Verificar si el producto ya existe en el informe de ventas de hoy, si es 0 significa que no está
                    {
                        sales.data.push(data)
                        //sales.push(data)
                        
                    }else
                    {
                        sales.data[index].quantity=sales.data[index].quantity+op.quantity
                        //sales[index].quantity=sales[index].quantity+op.quantity
                    }
                }
                //Ya que se tiene el informe de ventas en el objeto sales se procede a ordenar
                var sorted_sales=this.Sort_products(sales.data,"asc")
            }
            else
            {
                continue
            }
            
        }
        for(var i=0;i<3;i++)
        {
            Rta.data.push(sorted_sales[i])
        }
        return Rta
    }
    async best({request,response})
    {
        const Rta={}
        Rta.status=200
        Rta.message="Productos más vendidos el día 1 de marzo."
        Rta["data"]=[]
        const sales={}
        sales["data"]=[]

        const date=request.input('deliveryDate')

        const Order = use("App/Models/Order")
        const OrdersProducts = use("App/Models/OrdersProducts")
        const Product = use("App/Models/Product")
        const Provider = use("App/Models/Provider")
        const Inventory = use("App/Models/Inventory")

        const orders = await Order.query().where('deliveryDate', '=', date).orderBy('priority', 'asc').fetch()

        for (const order of orders.toJSON()) {
            //if(this.Format_date(order.deliveryDate)==date)
            if(order.deliveryDate==date)
            {
                const ordersproducts= await OrdersProducts.query().where('order_id', '=', order.id).fetch()
                for(const op of ordersproducts.toJSON())
                {
                    const product= await Product.find(op.product_id)
                    var data={}
                    data.product_id=op.product_id
                    data.name=product.name
                    data.quantity=op.quantity
                    var index=this.Check_sales(sales.data,data.product_id)
                    if(index==0)//Verificar si el producto ya existe en el informe de ventas de hoy, si es 0 significa que no está
                    {
                        sales.data.push(data)
                        //sales.push(data)
                        
                    }else
                    {
                        sales.data[index].quantity=sales.data[index].quantity+op.quantity
                        //sales[index].quantity=sales[index].quantity+op.quantity
                    }
                }
                //Ya que se tiene el informe de ventas en el objeto sales se procede a ordenar
                var sorted_sales=this.Sort_products(sales.data,"desc")
            }
            else
            {
                continue
            }
            
        }
        for(var i=0;i<3;i++)
        {
            Rta.data.push(sorted_sales[i])
        }
        return Rta        
    }

}

module.exports = SaleController
