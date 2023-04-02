# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.50"
    }
  }
    required_version = ">= 1.0.0"
    
}
provider "azurerm" {
  features {}
}
