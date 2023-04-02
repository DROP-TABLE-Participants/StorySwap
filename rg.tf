resource "azurerm_resource_group" "rg" {
  name     = "storyswap-resource-group"
  location = "West Europe"
}

resource "azurerm_service_plan" "appserviceplan" {
  name                = "storyswap-serviceplan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type = "Linux"
  sku_name = "B1"
}
