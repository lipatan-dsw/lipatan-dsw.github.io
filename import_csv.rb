#!/usr/bin/env ruby

require "jekyll-import";
JekyllImport::Importers::CSV.run({
  "file" => "jengkol.csv"
})