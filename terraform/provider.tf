provider "aws" {
  profile = "default"
  region  = "eu-west-2"
}

provider "aws" {
  alias = "virginia"
  region = "us-east-1"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1"
    }
  }
}
