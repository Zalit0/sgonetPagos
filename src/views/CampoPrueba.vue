<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAdminStore } from '../stores/adminStore';
import { SearchOutlined } from '@ant-design/icons-vue';



const adminStore=useAdminStore()
const {clientes} =storeToRefs(adminStore)

const searchText= ref('')
const searchedColumn= ref('')

const searchInput = ref();


const columns = [
    {
      title: 'DNI',
      dataIndex: 'id',
      key: 'id',
      customFilterDropdown: true,
      onFilter: (value, record) =>
        record.id.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
      {
        title: 'Nombre completo',
        dataIndex: 'name',
        key: 'name',
        customFilterDropdown: true,
        onFilter: (value, record) =>
          record.name.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              searchInput.value.focus();
            }, 100);
          }
        },
      },
      {
        title: 'Domicilio',
        dataIndex: 'domicilio',
        key: 'domicilio',
      },
      {
        title: 'Barrio',
        dataIndex: 'barrio',
        key: 'barrio',
      },
      {
        title: 'Zona',
        dataIndex: 'zona',
        key: 'zona',
      },
      {
        title: 'Abono',
        dataIndex: 'abono',
        key: 'abono',
      },
      {
        title: 'Accion',
        dataIndex:'id',
        key: 'operacion',
   
      },
      
    ];

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      searchText.value = selectedKeys[0];
      searchedColumn.value = dataIndex;
    };

    const handleReset = clearFilters => {
      clearFilters({ confirm: true });
      searchText.value = '';
    };

</script>

<template>

<h1>Listados de Clientes</h1>
    
<a-table :data-source="clientes" :columns="columns" bordered>
    <template #headerCell="{ column }">
      
    </template>
    <template
      #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Buscar ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"/>
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
    </template>
    <template #customFilterIcon="{ filtered }">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #bodyCell="{ text, column }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            :key="i"
            class="highlight"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-if="column.key === 'operacion'"> <RouterLink :to="`/editClient/${text}`"> Editar </RouterLink>  </template>
    </template>
    
  </a-table>

</template>
