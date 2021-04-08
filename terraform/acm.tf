variable "domains" {
  type = map(string)
}

resource "aws_acm_certificate" "domain_cert" {
    domain_name       = element(keys(var.domains), 0)
    subject_alternative_names = slice(keys(var.domains), 1, length(var.domains))
    validation_method = "DNS"

    provider = aws.virginia

    lifecycle {
        create_before_destroy = true
    }
}

resource "aws_route53_record" "verify_dns" {
  for_each = {
    for dvo in aws_acm_certificate.domain_cert.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = var.domains[dvo.domain_name]
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}

resource "aws_acm_certificate_validation" "validation" {
  certificate_arn         = aws_acm_certificate.domain_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.verify_dns : record.fqdn]

  provider = aws.virginia
}
