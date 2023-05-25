<?php

declare(strict_types=1);

namespace Drupal\ckeditor5_drupalbreaks\Plugin\Filter;

use Drupal\Component\Utility\Html;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * NBSP Cleaner Filter class. Implements process() method only.
 *
 * @Filter(
 *   id = "drupalbreaks_filter",
 *   title = @Translation("Cleanup drupalbreak markup"),
 *   description = @Translation("Replaces <code>&lt;drupalbreaks&gt;&lt;/drupalbreaks&gt;</code> tag with
 *  <code>&lt;!--break--&gt;</code> to ensure the seperation of teaser and body."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_TRANSFORM_IRREVERSIBLE,
 * )
 */
class DrupalbreaksFilter extends FilterBase {

  /**
   * The drupalbreaks character in UFT-8.
   */
  const UTF_8_NBSP = "\xc2\xa0";

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    $filtered = $this->swapNbspHtml($text);
    if ($filtered) {
      $result = new FilterProcessResult($filtered);
    }
    else {
      $result = new FilterProcessResult($text);
    }

    return $result;
  }

  /**
   * Replace <span class="drupalbreaks"> and <drupalbreaks></drupalbreaks> tags with respected HTML.
   *
   *
   * @param string $text
   *   The HTML string to replace <span class="drupalbreaks"> and <drupalbreaks></drupalbreaks> tags.
   *
   * @return string
   *   The HTML with all the <span class="drupalbreaks"> and <drupalbreaks></drupalbreaks>
   *   tags replaced with their respected html.
   */
  protected function swapNbspHtml($text) {
    $document = Html::load($text);
    $xpath = new \DOMXPath($document);
    // expression parameter = generated div container from CKEditor5 model layer
    foreach ($xpath->query('drupalbreak') as $node) {
      if (!empty($node)) {
        $node->parentNode->replaceChild(new \DOMText('<!--break-->'), $node);
      }
    }
    return Html::serialize($document);
  }

}

