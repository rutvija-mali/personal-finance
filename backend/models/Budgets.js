import mongoose from "mongoose";

const budgetsSchema = mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'

  },
  month:{
    type: Number,
    min: 1,
    max: 12,
    required:true
  },
  year:{
    type: Number,
    required:true
  },
  totalBudget:{
    type: Number,
    required:true
  },
  categoryBudgets:{
    type: Map,
    of: Number,
    default:{}
  },

},
 {timestamps:true}
)

// budgetsSchema.index({userId:1, month:1, year:1}, {unique:true});

export default mongoose.model("Budget",budgetsSchema)