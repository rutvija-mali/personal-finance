
import mongoose from mongoose;

const expenseSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        default:"INR",
        immutable:true
    },
    category:{
        type:String,
        enum:[
            "Food & Dining",
            "Transportation",
            "Housing",
            "Utilities",
            "Healthcare",
            "Entertainment",
            "Shopping",
            "Travel",
            "Education",
            "Insurance",
            "Savings & Investments",
            "Miscellaneous"        
        ],
        required:true

    },
    date:{
        type: Date,
        required: true
    },
    confidence:{
        type:Number,
        min:0,
        max:1
    },
    source:{
        type:String,
        enum:['manual', 'ai','voice'],
        required:true
    },
    rawText:{
        type:String
    },
    meta:{
        nlpModel:String,
        actions:[String]
    },
    
},
{timestamps:true}
)

export default mongoose.model('Expense',expenseSchema);