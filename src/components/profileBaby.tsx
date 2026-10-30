import type {Baby} from "../types/types"
export default function ProfileBaby({name,birthDate,birthWeightGrams}:Baby)
{
    return(
       <>
       <div className="mt-4 flex flex-col gap-1 rounded-2xl bg-linear-to-l from-teal-50 via-sky-50 to-violet-50 p-5 ring-1 ring-teal-100 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-500/10">
        <h1 className="text-xl font-bold text-teal-800">שם: {name}</h1>
        <h1 className="text-teal-900">נולדתי בתאריך: {new Date(birthDate).toLocaleDateString("he-IL")}</h1>
        <h3 className="text-teal-900">ושקלתי {birthWeightGrams} גרם </h3>
        
       </div>
       </>
    )
}


// {notes&&<p>{notes}</p>}
