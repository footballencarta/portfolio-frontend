resource "aws_route53_record" "portfolio_frontend_domain" {
    for_each = var.domains

    name            = each.key
    type            = "A"
    zone_id         = each.value
    allow_overwrite = true

    alias {
        name                   = aws_cloudfront_distribution.s3_distribution.domain_name
        zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
        evaluate_target_health = false
    }
}
