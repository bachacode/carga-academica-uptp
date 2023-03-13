<script setup lang="ts">
import AuthLayout from './AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <!--Container-->
    <div class="container mx-auto w-full">
      <div class="mb-16 w-full px-4 leading-normal text-gray-800 md:mt-8 md:px-0">
        <!--Console Content-->
        <div class="flex flex-wrap">
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <div class="rounded border bg-white p-2 shadow">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded bg-green-600 p-3">
                    <i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-500">Total Revenue</h5>
                  <h3 class="text-3xl font-bold">
                    $3249 <span class="text-green-500"><i class="fas fa-caret-up"></i></span>
                  </h3>
                </div>
              </div>
            </div>
            <!--/Metric Card-->
          </div>
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <div class="rounded border bg-white p-2 shadow">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded bg-pink-600 p-3">
                    <i class="fas fa-users fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-500">Total Users</h5>
                  <h3 class="text-3xl font-bold">
                    249 <span class="text-pink-500"><i class="fas fa-exchange-alt"></i></span>
                  </h3>
                </div>
              </div>
            </div>
            <!--/Metric Card-->
          </div>
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <div class="rounded border bg-white p-2 shadow">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded bg-yellow-600 p-3">
                    <i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-500">New Users</h5>
                  <h3 class="text-3xl font-bold">
                    2 <span class="text-yellow-600"><i class="fas fa-caret-up"></i></span>
                  </h3>
                </div>
              </div>
            </div>
            <!--/Metric Card-->
          </div>
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <div class="rounded border bg-white p-2 shadow">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded bg-blue-600 p-3">
                    <i class="fas fa-server fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-500">Server Uptime</h5>
                  <h3 class="text-3xl font-bold">152 days</h3>
                </div>
              </div>
            </div>
            <!--/Metric Card-->
          </div>
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <div class="rounded border bg-white p-2 shadow">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded bg-indigo-600 p-3">
                    <i class="fas fa-tasks fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-500">To Do List</h5>
                  <h3 class="text-3xl font-bold">7 tasks</h3>
                </div>
              </div>
            </div>
            <!--/Metric Card-->
          </div>
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Metric Card-->
            <div class="rounded border bg-white p-2 shadow">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded bg-red-600 p-3">
                    <i class="fas fa-inbox fa-2x fa-fw fa-inverse"></i>
                  </div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-500">Issues</h5>
                  <h3 class="text-3xl font-bold">
                    3 <span class="text-red-500"><i class="fas fa-caret-up"></i></span>
                  </h3>
                </div>
              </div>
            </div>
            <!--/Metric Card-->
          </div>
        </div>

        <!--Divider-->
        <hr class="my-8 mx-4 border-b-2 border-gray-400" />

        <div class="mt-2 flex flex-grow flex-row flex-wrap">
          <div class="w-full p-3 md:w-1/2 xl:w-1/3">
            <!--Template Card-->
            <div class="rounded border bg-white shadow">
              <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Template</h5>
              </div>
              <div class="p-5"></div>
            </div>
            <!--/Template Card-->
          </div>

          <div class="w-full p-3">
            <!--Table Card-->
            <div class="rounded border bg-white shadow">
              <div class="border-b p-3">
                <h5 class="font-bold uppercase text-gray-600">Table</h5>
              </div>
              <div class="p-5">
                <table class="w-full p-5 text-gray-700">
                  <thead>
                    <tr>
                      <th class="text-left text-blue-900">Name</th>
                      <th class="text-left text-blue-900">Side</th>
                      <th class="text-left text-blue-900">Role</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Obi Wan Kenobi</td>
                      <td>Light</td>
                      <td>Jedi</td>
                    </tr>
                    <tr>
                      <td>Greedo</td>
                      <td>South</td>
                      <td>Scumbag</td>
                    </tr>
                    <tr>
                      <td>Darth Vader</td>
                      <td>Dark</td>
                      <td>Sith</td>
                    </tr>
                  </tbody>
                </table>
                <p class="py-2"><a href="#">See More issues...</a></p>
              </div>
            </div>
            <!--/table Card-->
          </div>
        </div>
        <!--/ Console Content-->
      </div>
    </div>
    <!--/container-->
  </AuthLayout>
</template>
