require "html-proofer"

task :build do
  jekyll_env = ENV.fetch("JEKYLL_ENV", "production")
  puts "Running jekyll build with JEKYLL_ENV=#{jekyll_env}"
  sh "JEKYLL_ENV=#{jekyll_env} bundle exec jekyll build"
end

task :serve do
  puts "Serving jekyll build with live reload at http://127.0.0.1:4000"
  sh "jekyll serve -l --baseurl ''"
end

task :test do
  options = {
    internal_domains: [
      "developers.shipcloud.io"
    ],
    typhoeus: {
      ssl_verifypeer: false,
      headers: {
        "User-Agent" => "Mozilla/5.0 (compatible; developers.shipcloud.io htmlproofer) Chrome/87.0.4280.88"
      }
    },
    url_ignore: [
      "https://requestbin.com",
      "https://www.ups.com/media/de/service_guide_de_preview.pdf",
      "https://www.dhl.de/en/paket/information/geschaeftskunden/service-wunschzeit.html",
      "https://us7.campaign-archive.com/home/?u=61172dea8790607c71d26bb86&id=4319f24b6f",
      "http://john-sheehan.com/blog/ultimate-api-webhook-backend-service-debugging-testing-monitoring-and-discovery-tools-list",
    ]
  }
  HTMLProofer.check_directory("./_site", options).run
end

task default: [:build, :test]
