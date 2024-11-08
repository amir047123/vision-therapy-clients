const Stats = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        Worldwide Amblyopia Patent Stats
        </h2>

        <p className="mt-4 text-gray-500 sm:text-xl">
        a type of poor vision that usually happens in just 1 eye but less commonly in both eyes.
        </p>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Total Population
          </dt>

          <dd className="text-4xl font-extrabold text-primary md:text-5xl">
          8 Billion
          </dd>
        </div>

        <div className="bg-white flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Official Addons
          </dt>

          <dd className="text-4xl font-extrabold text-primary md:text-5xl">
            4/5%
          </dd>
        </div>

        <div className="bg-white flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Lazy eye patent
          </dt>

          <dd className="text-4xl font-extrabold text-primary md:text-5xl">
            400 M
          </dd>
        </div>

        <div className="bg-white flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Happy patent
          </dt>

          <dd className="text-4xl font-extrabold text-primary md:text-5xl">
            5k
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default Stats;
