import { Suspense } from "react";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import ModelList from "./components/ModelList";
import PageTitle from "./components/PageTitle";

export async function generateStaticParams() {
  const staticMakesIds = [
    "440", "441", "442", "443", "445", "448", "449", "452", "454", "456", "460", "464", 
    "465", "466", "467", "468", "469", "470", "471", "472", "473", "474", "475", "476", 
    "477", "478", "480", "481", "482", "485", "492", "493", "497", "498", "499", "502", 
    "504", "509", "515", "523", "533", "536", "539", "542", "565", "572", "582", "583", 
    "584", "603", "606", "629", "771", "847", "972", "986", "992", "1056", "1077", "1124", 
    "1142", "1146", "1151", "1288", "1292", "1393", "1498", "1683", "1755", "1777", "1869", 
    "1896", "1991", "2018", "2049", "2131", "2236", "2376", "2408", "2409", "2665", "2745", 
    "3176", "3440", "3540", "3583", "3706", "3766", "4162", "4220", "4355", "4410", "4451", 
    "4596", "4634", "4644", "4764", "4767", "4859", "5015", "5042", "5083", "5122", "5208", 
    "5367", "5381", "5464", "5468", "5552", "5553", "5554", "5555", "5557", "5657", "5661", 
    "5760", "5767", "5848", "5938", "6018", "6069", "6263", "6264", "6265", "6313", "6364", 
    "6408", "6473", "6663", "6759", "6792", "6880", "6986", "7099", "7207", "7225", "7425", 
    "7477", "7765", "7836", "8395", "8549", "8605", "8785", "9250", "9326", "9364", "9376", 
    "9401", "9448", "9458", "9533", "9572", "9720", "9759", "10029", "10030", "10031", "10047", 
    "10224", "10256", "10393", "10623", "10647", "10919", "11076", "11346", "11792", "11832", 
    "11856", "11921", "11938", "12074", "12400", "12550", "12706", "12771", "12783", "12894", 
    "12948", "12980", "12991", "13018", "13022", "13024", "13025", "13026", "13028", "13271"
  ];
  const currentYear = new Date().getFullYear();
  const staticYears = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  const params = [];

  for (const make of staticMakesIds) {
    for (const year of staticYears) {
      params.push({ makeId: make, year: String(year) });
    }
  }

  return params;
}

export default async function Result({ params }) {
  const { makeId, year } = await params;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`;

  let makeName;
  let models = [];
  let error = null;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Results && data.Results.length > 0) {
      makeName = data.Results[0].Make_Name;
      models = data.Results.filter((value, index, self) =>
        index === self.findIndex((t) => t.Model_ID === value.Model_ID)
      );
    } else {
      error = "No models found for this make and year.";
    }
  } catch (err) {
    error = "Failed to fetch vehicle models.";
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <PageTitle title="Vehicle Models" />
      <Suspense fallback={<LoadingSpinner />}>
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <ModelList makeName={makeName} year={year} models={models} />
        )}
      </Suspense>
    </main>
  );
}
