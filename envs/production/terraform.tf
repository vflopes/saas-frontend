locals {
  tfstate_bucket_name = "tfstate-31115663950920251219185056487700000001"
  root_domain         = "saas.vflopes.com"
}

terraform {
  backend "s3" {
    bucket       = "tfstate-31115663950920251219185056487700000001"
    key          = "saas-frontend/production.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }


  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.27.0"
    }
  }
}

provider "aws" {}

data "aws_s3_bucket" "tfstate" {
  bucket = local.tfstate_bucket_name
}


data "aws_route53_zone" "root_domain" {
  name = local.root_domain
}

data "aws_acm_certificate" "root_domain" {
  region   = "us-east-1"
  domain   = local.root_domain
  statuses = ["ISSUED"]
}
