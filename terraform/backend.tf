terraform {
    backend "s3" {
        bucket = "dw-terraform-deploys"
        key = "portfolio-frontend"
        region = "eu-west-2"
    }
}
