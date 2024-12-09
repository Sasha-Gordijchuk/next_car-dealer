export default function ModelList({ makeName, year, models }) {
    return (
      <div className="w-full max-w-3xl bg-white shadow rounded-lg p-4">
        <h2 className="text-lg text-gray-900 font-semibold mb-4">
          Models for {makeName} ({year})
        </h2>
        <ul className="space-y-2">
          {models.map((model) => (
            <li
              key={model.Model_ID}
              className="border-b py-2 text-gray-800 flex items-center"
            >
              <span>{model.Model_Name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  