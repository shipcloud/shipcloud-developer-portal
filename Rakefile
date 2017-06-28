require "html-proofer"

task :build do
  puts "Running jekyll buil"
  sh "bundle exec jekyll build"
end

task :test do
  options = {
    assume_extension: true,
    internal_domains: [
      "developers.shipcloud.io"
    ],
    typhoeus: {
      ssl_verifypeer: false
    }
  }
  HTMLProofer.check_directory("./_site", options).run
end
