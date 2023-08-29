<template>
  <v-app>
    <v-header class="border-b">
      <v-toolbar color="primary">
        <v-navigation-drawer
          color="primary"
          expand-on-hover
          rail
          v-model="isDrawerOpen"
          class="align-center justify-center"
        >
          <v-list>
            <v-list-item
              v-for="(item, index) in navigationItems"
              :key="index"
              :prepend-icon="item.icon"
            >
              {{ item.label }}
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-app-bar-nav-icon
          @click="isDrawerOpen = !isDrawerOpen"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text v-for="(item, index) in topToolbarItems" :key="index">
            {{ item.label }}
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>

        <v-toolbar-items
          class="hidden-sm-and-down d-flex justify-center align-center mr-4"
        >
          <v-badge class="mr-3" content="32" overlap>
            <v-btn icon>
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-badge>
          <v-menu>
            <template #activator="{ props }">
              <v-btn focusable icon>
                <v-avatar v-bind="props" class="mt-2" color="primary" size="32">
                  <v-img>
                    <v-icon color="white" class="white--text" size="32">
                      mdi-account-circle
                    </v-icon>
                  </v-img>
                </v-avatar>
              </v-btn>
            </template>

            <v-card min-width="200">
              <v-list :lines="false" density="compact" nav>
                <v-list-item
                  v-for="(item, index) in profileMenuItems"
                  :key="index"
                  :prepend-icon="item.icon"
                  class="px-4"
                >
                  <v-list-item-title> {{ item.label }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>
    </v-header>

    <v-main color="backgroud">
      <v-container class="text-center py-4">
        <v-card class="py-4 px-4 mb-4">
          <v-row>
            <v-col v-for="(label, index) in searchLabels" :key="index" cols="3">
              <v-text-field
                v-if="label !== 'Canal'"
                v-model="searchFields[index]"
                :label="label"
                @focus="resetSearchField(index, label)"
                append-inner-icon="mdi-magnify"
                variant="solo-filled"
                single-line
                hide-details
              ></v-text-field>
              <v-select
                v-else
                v-model="selectedChannel"
                :items="channels"
                variant="solo-filled"
                :label="label"
                hide-details
                scrollable
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <v-container class="custom-container">
        <v-card class="mt-3 border table">
          <v-row class="custom-table">
            <v-col>
              <div class="table-wrapper">
                <v-table class="table">
                  <thead class="table-header">
                    <tr class="table-header-row">
                      <th>
                        <v-checkbox
                          v-model="checkbox"
                          color="primary"
                          hide-details
                        ></v-checkbox>
                      </th>
                      <th v-for="(column, index) in tableColumns" :key="index">
                        {{ column }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(order, index) in orders"
                      :key="index"
                      class="table-row"
                    >
                      <td>
                        <v-checkbox
                          v-model="order.selected"
                          color="primary"
                          hide-details
                        ></v-checkbox>
                      </td>
                      <td
                        v-for="(value, colIndex) in order.columns"
                        :key="colIndex"
                      >
                        <span
                          :class="[
                            'status-cell',
                            'status-' + statusColors[value],
                          ]"
                        >
                          {{ value }}
                        </span>
                        <template v-if="colIndex === 7">
                          <v-icon
                            v-for="(icon, iconIndex) in expeditionIcons"
                            :key="iconIndex"
                            :class="[
                              'expedition-icon-' +
                                getExpeditionIconColor(value),
                            ]"
                          >
                            {{ getExpeditionIcon(value) }}
                          </v-icon>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.status-cell {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
}

.status-green {
  background-color: #5cb85c;
  color: white;
}

.status-yellow {
  background-color: #f0ad4e;
  color: white;
}

.status-orange {
  background-color: #f0ad4e;
  color: white;
}

.status-red {
  background-color: #d9534f;
  color: white;
}

.status-blue {
  background-color: #428bca;
  color: white;
}

.status-purple {
  background-color: #9b59b6;
  color: white;
}

.custom-table {
  margin-left: 0; /* Center the table horizontally */
  margin-right: 0; /* Center the table horizontally */
  width: 100%;
}
.table-header-row th {
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
}
.table-row td {
}

.table-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #e0e0e0;
}

.table {
  max-width: 109rem;
  margin: 0 auto;
  width: 109rem;
}

.custom-container {
  width: 100%;
  margin-left: 2rem;
  margin-right: 2rem;
}

.table-wrapper {
  overflow-y: auto;
  max-height: 60vh;
  overflow-x: hidden;
}
.table-body {
  overflow-y: auto;
}

.expedition-icon-green {
  color: #5cb85c; /* Cor para ícones com status "Aprovado" */
}

.expedition-icon-yellow {
  color: #f0ad4e; /* Cor para ícones com status "Pendente" */
}

.expedition-icon-red {
  color: #d9534f; /* Cor para ícones com status "Cancelado" */
}

.expedition-icon-blue {
  color: #428bca; /* Cor para ícones com status "Entregue" */
}

.expedition-icon-purple {
  color: #9b59b6; /* Cor para ícones com status "Faturado" */
}
</style>

<script setup lang="ts">
import { ref } from "vue";
const isDrawerOpen = ref(false);
const checkbox = ref(false);
const getExpeditionIconColor = (status) => {
  switch (status) {
    case "aprovado":
      return "green";
    case "cancelado":
      return "red";
    case "trânsito":
      return "orange";
    case "entregue":
      return "blue";
    case "faturado":
      return "purple";
    default:
      return "green";
  }
};

const getExpeditionIcon = (status) => {
  switch (status.toLowerCase()) {
    case "aprovado":
      return expeditionIcons.Icon1;
    case "cancelado":
      return expeditionIcons.Icon2;
    case "trânsito":
      return expeditionIcons.Icon3;
    case "entregue":
      return expeditionIcons.Icon4;
    case "faturado":
      return expeditionIcons.Icon5;
    default:
      return expeditionIcons.Icon1;
  }
};

const tableColumns = [
  "Canal",
  "Skus",
  "Ids dos Pedidos",
  "Data de Criação",
  "Nome Completo",
  "Valor Total",
  "Status",
  "Expedição",
  "SLA",
  "Ações",
];
const searchFields = ["", "", "", ""];
const searchLabels = ["Original ID", "Demais IDs", "Canal", "Plugg ID"];
const channels = [
  "Channel A",
  "Channel B",
  "Channel C",
  "Channel D",
  "Channel E",
  "Channel F",
  "Channel G",
  "Channel H",
  "Channel I",
  "Channel J",
  "Channel K",
  "Channel L",
  "Channel M",
  "Channel N",
  "Channel O",
  "Channel P",
  "Channel Q",
  "Channel R",
  "Channel S",
  "Channel T",
  "Channel U",
  "Channel V",
  "Channel W",
  "Channel X",
  "Channel Y",
  "Channel Z",
];
const selectedChannel = ref("");

const resetSearchField = (index, label) => {
  searchFields[index] = "";
  setTimeout(() => {
    searchFields[index] = label;
  }, 0);
};

const navigationItems = [
  { label: "Home", icon: "mdi-home" },
  { label: "Catálogo", icon: "mdi-book-open-page-variant" },
  { label: "Pedidos", icon: "mdi-cash" },
  { label: "Expedição", icon: "mdi-truck-delivery" },
  { label: "Sac", icon: "mdi-account-voice" },
  { label: "Canais", icon: "mdi-call-split" },
  { label: "ERPs", icon: "mdi-office-building-cog" },
  { label: "Plataformas", icon: "mdi-shopping" },
  { label: "Logísticas", icon: "mdi-map-marker" },
  { label: "Ferramentas", icon: "mdi-toolbox" },
];

const topToolbarItems = [
  { label: "Dashboard" },
  { label: "Catálogo" },
  { label: "Painel de Pedidos" },
  { label: "Tela de Expedição" },
];

const profileMenuItems = [
  { label: "Perfil", icon: "mdi-account-circle" },
  { label: "Faturas", icon: "mdi-account-cash" },
  { label: "Campanhas", icon: "mdi-account-multiple-plus" },
  { label: "Integrações", icon: "mdi-source-branch" },
  { label: "Desenvolver", icon: "mdi-code-braces" },
  { label: "Histórico", icon: "mdi-history" },
  { label: "Configurações", icon: "mdi-cog" },
  { label: "Sair", icon: "mdi-logout" },
];

const statusColors = {
  aprovado: "green",
  cancelado: "red",
  trânsito: "orange",
  entregue: "blue",
  faturado: "purple",
};

const status = ["Aprovado", "Cancelado", "Transito", "Entregue", "Faturado"];

const expeditionIcons = {
  Icon1: "mdi-truck-delivery",
  Icon2: "mdi-package-variant-closed",
  Icon3: "mdi-cash",
};

const orders = [
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "cancelado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "faturado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "trânsito",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "entregue",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
  {
    selected: false,
    columns: [
      "Mercado Livre",
      "ABC123",
      "2000000000001",
      "01/01/2021",
      "Lucas Previato",
      "R$ 100,00",
      "Aprovado",
      "",
      "13/01/2021",
      "",
    ],
  },
];

const selectAll = ref(false);
</script>
