


using System.Text.RegularExpressions;

string text = "Biotin 30 MCG+Citrus bioflavonoids 12.5 MG+Folic acid 50 MCG+Garlic oil 2 MG+Ginseng 21.25 MG+Green tea powder 10 MG+L-glutamic acid 20 MG+L-lysine 19.6 MG+Levocarnitine 5 MG+Lycopene 2 MG+Methionine 22 MG+Mixed carotene 5 MG+Niacinamide 15 MG+Vitamin A 1600 IU+Vitamin B1 1 MG+Vitamin B2 1 MG+Vitamin B6 0.5 MG+Vitamin C 25 MG+Vitamin E 10 IU+Vitamin K 65 MCG";

rege(text);

static void rege(string text)
{
    string pattern = @"([\w\s-]+) \d+\.?\d* [A-Z]+";

    Regex regex = new Regex(pattern);

    foreach (Match match in regex.Matches(text))
    {
        Console.WriteLine(match.Groups[1].Value.Trim());
    }
}


//// Build INSERT statement
//string values = "";
//foreach (string item in items)
//{
//    if (values.Length > 0)
//    {
//        values += ", ";
//    }
//    values += "('" + item + "')";
//}
//string insertStatement = "INSERT INTO Ingredients (IngrName) VALUES " + values + ";";

//Console.WriteLine(insertStatement);

