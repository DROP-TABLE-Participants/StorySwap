resource "azurerm_app_service" "webapp" {
  name                = "storyswap"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_service_plan.appserviceplan.id
  site_config {
    linux_fx_version  = "NODE|18a-lts"
  }
  provisioner "local-exec" {
    command = "az webapp deployment list-publishing-profiles --resource-group ${azurerm_resource_group.rg.name} --name ${azurerm_app_service.webapp.name} --xml > publish.profile.xml"
  }
}
